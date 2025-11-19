/**
 * Lightweight in-memory mock that emulates the subset of the mysql2 API
 * used by the application. This enables exercising the HTTP endpoints
 * without requiring an actual MySQL server.
 */
const clone = data => JSON.parse(JSON.stringify(data));

const seedData = [
  {
    id: 1,
    title: 'Introduction to Node.js',
    author: 'John Doe',
    description: 'A comprehensive guide to getting started with Node.js',
    type: 'Video',
    url: 'https://example.com/nodejs-intro',
    uploadedFile: null,
    created_at: '2023-01-01T00:00:00.000Z',
    updated_at: '2023-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    title: 'Advanced MySQL Queries',
    author: 'Jane Smith',
    description: 'Learn advanced SQL techniques and optimization',
    type: 'Lecture',
    url: 'https://example.com/mysql-advanced',
    uploadedFile: null,
    created_at: '2023-01-02T00:00:00.000Z',
    updated_at: '2023-01-02T00:00:00.000Z'
  },
  {
    id: 3,
    title: 'JavaScript ES6 Guide',
    author: 'Bob Johnson',
    description: 'Modern JavaScript features and best practices',
    type: 'PDF',
    url: 'https://example.com/js-es6-guide',
    uploadedFile: null,
    created_at: '2023-01-03T00:00:00.000Z',
    updated_at: '2023-01-03T00:00:00.000Z'
  }
];

let contentData = seedData.map(clone);
let nextId = contentData.length + 1;

const normalize = sql => sql.trim().toLowerCase();

const findById = id => contentData.find(item => item.id === Number(id));

const mockPool = {
  async query(sql, params = []) {
    const normSql = normalize(sql);

    if (normSql.startsWith('select * from content order by')) {
      const rows = [...contentData]
        .sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .map(clone);
      return [rows, []];
    }

    if (normSql.startsWith('select * from content where id = ?')) {
      const record = findById(params[0]);
      return [record ? [clone(record)] : [], []];
    }

    if (normSql.startsWith('insert into content')) {
      const [title, author, description, type, url, uploadedFile] = params;
      const now = new Date().toISOString();
      const newItem = {
        id: nextId++,
        title,
        author,
        description,
        type,
        url,
        uploadedFile: uploadedFile || null,
        created_at: now,
        updated_at: now
      };
      contentData.push(newItem);
      return [{ insertId: newItem.id }, []];
    }

    if (normSql.startsWith('update content set')) {
      const lowerSql = sql.toLowerCase();
      const setStart = lowerSql.indexOf('set') + 3;
      const whereIndex = lowerSql.lastIndexOf('where');
      const setClause = sql.slice(setStart, whereIndex).trim();
      const columns = setClause
        .split(',')
        .map(part => part.split('=')[0].trim().replace(/`/g, ''));

      const values = params.slice(0, params.length - 1);
      const id = params[params.length - 1];
      const record = findById(id);

      if (!record) {
        return [{ affectedRows: 0 }, []];
      }

      columns.forEach((col, idx) => {
        record[col] = values[idx];
      });
      record.updated_at = new Date().toISOString();

      return [{ affectedRows: 1 }, []];
    }

    if (normSql.startsWith('delete from content where id = ?')) {
      const id = Number(params[0]);
      contentData = contentData.filter(item => item.id !== id);
      return [{ affectedRows: 1 }, []];
    }

    throw new Error(`Mock pool received unsupported query: ${sql}`);
  },

  async getConnection() {
    return {
      release() {}
    };
  }
};

module.exports = mockPool;
