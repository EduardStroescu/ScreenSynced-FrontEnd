import { contentGenres } from "@api/tmdb/movieEndpoints";
import { findGenreIdByName, getYoutubeLink, getYoutubeLinks } from "@lib/utils";
import { describe, expect, it } from "vitest";

describe("getYoutubeLink", () => {
  it("returns null if the videoId is null", () => {
    const videoIds = null;
    const youtubeLink = getYoutubeLink(videoIds);
    expect(youtubeLink).toBeNull();
  });

  it("returns null if the videoId is undefined", () => {
    const videoIds = undefined;
    const youtubeLink = getYoutubeLink(videoIds);
    expect(youtubeLink).toBeNull();
  });

  it("returns the correct YouTube link", () => {
    const videoIds = ["123456"];
    const youtubeLink = getYoutubeLink(videoIds);
    expect(youtubeLink).toBe("https://www.youtube.com/watch?v=123456");
  });
});

describe("getYoutubeLinks", () => {
  it("returns null if the videoIds are empty", () => {
    const videoIds = [];
    const youtubeLink = getYoutubeLinks(videoIds);
    expect(youtubeLink).toEqual([]);
  });

  it("returns empty array if the videoId are undefined", () => {
    const videoIds = undefined;
    const youtubeLinks = getYoutubeLinks(videoIds);
    expect(youtubeLinks).toEqual([]);
  });

  it("returns empty array if the videoId are null", () => {
    const videoIds = undefined;
    const youtubeLinks = getYoutubeLinks(videoIds);
    expect(youtubeLinks).toEqual([]);
  });

  it("returns the correct YouTube link", () => {
    const videoIds = ["123456", "987654321"];
    const youtubeLink = getYoutubeLinks(videoIds);
    expect(youtubeLink[0]).toBe("https://www.youtube.com/watch?v=123456");
    expect(youtubeLink[1]).toBe("https://www.youtube.com/watch?v=987654321");
  });
});

describe("findGenreIdByName", () => {
  describe("when contentType is movies", () => {
    it("returns null if the genreName is null", () => {
      const genreName = null;
      const genreId = findGenreIdByName("movies", genreName);
      expect(genreId).toBeNull();
    });

    it("returns null if the genreName is undefined", () => {
      const genreName = undefined;
      const genreId = findGenreIdByName("movies", genreName);
      expect(genreId).toBeNull();
    });

    it("returns null if the genreName is empty", () => {
      const genreName = "";
      const genreId = findGenreIdByName("movies", genreName);
      expect(genreId).toBeNull();
    });

    it("returns the correct genreId", () => {
      const genreName = contentGenres.movies[0].name;
      const genreId = findGenreIdByName("movies", genreName);
      expect(genreId).toBe(contentGenres.movies[0].id);
    });
  });

  describe("when contentType is series", () => {
    it("returns null if the genreName is null", () => {
      const genreName = null;
      const genreId = findGenreIdByName("series", genreName);
      expect(genreId).toBeNull();
    });

    it("returns null if the genreName is undefined", () => {
      const genreName = undefined;
      const genreId = findGenreIdByName("series", genreName);
      expect(genreId).toBeNull();
    });

    it("returns null if the genreName is empty", () => {
      const genreName = "";
      const genreId = findGenreIdByName("series", genreName);
      expect(genreId).toBeNull();
    });

    it("returns the correct genreId", () => {
      const genreName = contentGenres.series[0].name;
      const genreId = findGenreIdByName("series", genreName);
      expect(genreId).toBe(contentGenres.series[0].id);
    });
  });
});
