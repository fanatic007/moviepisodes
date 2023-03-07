import Fuse from "fuse.js";
import { FUSE_OPTIONS } from "./episodesSlice";
import { SortKey, SortState } from "../sort/sortSlice";

export function sortEpisodesBy(episodes:MovieEpisode[], {key, ascending}: SortState){
  return episodes.sort((a:MovieEpisode, b:MovieEpisode) => {
      switch(key){
        case SortKey.YEAR:
          let aDate = new Date(a[SortKey.YEAR]).getTime();
          let bDate = new Date(b[SortKey.YEAR]).getTime(); 
          return  ascending?aDate - bDate: bDate - aDate;
        case SortKey.EPISODE:
          return ascending? a[SortKey.EPISODE] -  b[SortKey.EPISODE] : b[SortKey.EPISODE] -  a[SortKey.EPISODE]
        case SortKey.TITLE:
          return ascending? a[SortKey.TITLE] >  b[SortKey.TITLE] ? 1:-1 : b[SortKey.TITLE] >  a[SortKey.TITLE]? 1:-1;
      }
  });
}

export function searchInEpisodes(episodes:MovieEpisode[], searchQuery:string){
  const fuse = new Fuse(episodes, FUSE_OPTIONS);
  return searchQuery
  ? (fuse.search(searchQuery).map((row: Fuse.FuseResult<MovieEpisode>) => row.item) as [])
  : episodes;
}