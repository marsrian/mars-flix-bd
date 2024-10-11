export async function getMovies() {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/movies`, {
        next: {
          revalidate: 10,
        },
      });
      if (!res.ok) {
        throw new Error("Fetch failed web series data");
      }
      return await res.json();
    } catch (error) {
      console.log(error.message);
      return { movies: [] };
    }
  }
  
  export async function getSingleMovie({id}) {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/movies/${id}`, {
        next: {
          revalidate: 10,
        },
      });
      if (!res.ok) {
        throw new Error("Fetch failed web series data");
      }
      return await res.json();
    } catch (error) {
      console.log(error.message);
    }
  }