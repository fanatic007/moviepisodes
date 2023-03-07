import { memo } from "react";
import { SortState } from "./sortSlice";
const TABLE_NO_ROWS = `No rows`;

export function getNewSortState(columnConfig:SortState, sortState:SortState) {
  let newSortState=columnConfig.key === sortState.key? {...sortState}:{...columnConfig};
  newSortState.ascending = !newSortState.ascending; 
  return newSortState; 
}
const TableSortHead = ({ sortState , columnsConfig, onSort }: any) => {
  return (
    <thead>
      <tr>
        { columnsConfig.map((columnConfig: SortState) => 
          <th onClick={() => onSort(getNewSortState(columnConfig,sortState))} key={columnConfig.key}>
            {columnConfig.header}&nbsp;
            { 
              (columnConfig.key === sortState.key || columnConfig.ascending!=null )  &&
              <span>
                {sortState.ascending ? `\u2191`:`\u2193`}
              </span>
            }
          </th>
        )}
      </tr>
    </thead>
  );
};

export default memo(TableSortHead);