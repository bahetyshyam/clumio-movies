import { useQuery } from "react-query";
import { MovieTVType } from "../../enums";
import axios from "../../api";

async function fetchPopularItems(
  type: MovieTVType,
  genreId: string | number,
  yearFrom: string,
  yearTo: string
): Promise<Movie[] | TV[]> {
  try {
    if (type === MovieTVType.Movie) {
      const response = await axios.get("movie/popular", {
        params: {
          with_genres: genreId === "all" ? "" : genreId,
          "primary_release_date.gte": yearFrom,
          "primary_release_date.lte": yearTo,
        },
      });
      return response.data.results;
    } else {
      const response = await axios.get("/tv/popular", {
        params: {
          with_genres: genreId === "all" ? "" : genreId,
          "first_air_date.gte": yearFrom,
          "first_air_date.lte": yearTo,
        },
      });
      return response.data.results;
    }
  } catch (err) {
    throw err;
  }
}

export default function usePopular(
  type: MovieTVType,
  genreId: string | number,
  yearFrom: string,
  yearTo: string
) {
  return useQuery<Movie[] | TV[]>(
    ["popular", type, genreId, yearFrom, yearTo],
    () => fetchPopularItems(type, genreId, yearFrom, yearTo)
  );
}
