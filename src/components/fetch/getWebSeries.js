export async function getWebSeries() {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/web-series`, {
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
      return { webSeries: [] };
    }
  }
  
  export async function getSingleWebSeries({id}) {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/web-series/${id}`, {
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