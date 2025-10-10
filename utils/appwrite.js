import { Client, TablesDB, Query, ID } from "appwrite";

const PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const ENDPOINT = process.env.APPWRITE_ENDPOINT;
const DB_ID = process.env.APPWRITE_DB_ID;

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

const db = new TablesDB(client)

export const updateSearchCount = async (query, movie) => {
  try {
    const res = await db.listRows({
      databaseId: DB_ID,
      tableId: 'metrics',
      queries: [
        Query.equal('query', query)
      ]
    })

    if (res.rows.length > 0) {
      const doc = res.rows[0];

      await db.incrementRowColumn({
        databaseId: DB_ID,
        column: 'count',
        rowId: doc.$id,
        tableId: 'metrics'
      });
    } else {
      await db.createRow({
        databaseId: DB_ID,
        rowId: ID.unique(),
        tableId: 'metrics',
        data: {
          query,
          movie_id: movie.id,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }
      })
    }
  } catch (e) {
    console.error(e);
  }
}

export const getTrendingMovies = async () => {
  try {
    const results = await db.listRows({
      databaseId: DB_ID,
      tableId: 'metrics',
      queries: [
        Query.limit(5),
        Query.orderDesc('count')
      ]
    })

    return results.rows;
  } catch (e) {
    console.log(e);
    return [];
  }
}