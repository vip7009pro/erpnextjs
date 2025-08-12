import {
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './AGTable.scss'
import { AgGridReact } from 'ag-grid-react';
import { IconButton } from '@mui/material';
import { AiFillCloseCircle, AiFillFileExcel } from 'react-icons/ai';
import { ColDef, GridApi } from 'ag-grid-community';
import PivotTable from '../PivotChart/PivotChart';
import PivotGridDataSource, { PivotGridDataType } from 'devextreme/ui/pivot_grid/data_source';
import { MdOutlinePivotTableChart } from 'react-icons/md';
import { SaveExcel } from '@/services/GlobalFunction';
interface AGInterface {
  data: Array<any>,
  columns?: Array<any>,
  toolbar?: ReactElement,
  showFilter?: boolean,
  suppressRowClickSelection?: boolean,
  rowHeight?: number,
  columnWidth?: number,
  onRowClick?: (e: any) => void,
  onCellClick?: (e: any) => void,
  onRowDoubleClick?: (e: any) => void,
  onSelectionChange: (e: any) => void,
  onCellEditingStopped?: (e: any) => void,
  onRowDragEnd?: (e: any) => void,
  getRowStyle?: (e: any) => any
}
const AGTable = forwardRef((ag_data: AGInterface, gridRef: any) => {
  const [showhidePivotTable, setShowHidePivotTable] = useState(false);
  const [selectedrow, setSelectedrow] = useState(0);
  const rowStyle = { backgroundColor: 'transparent', height: '20px' };
  const getRowStyle = (params: any) => {
    return { backgroundColor: '#eaf5e1', fontSize: '0.6rem' };
  };
  const onRowdoubleClick = (params: any) => {
  }
  const onRowDragEnd = (params: any) => {
  }
  const gridRefDefault = useRef<AgGridReact<any>>(null);
  const tableSelectionChange = useCallback(() => {
    if (gridRef !== null) {
      const selectedrows = gridRef.current!.api.getSelectedRows().length;
      setSelectedrow(selectedrows);
    }
    else {
      const selectedrows = gridRefDefault.current!.api.getSelectedRows().length;
      setSelectedrow(selectedrows);
    }
  }, []);
  /*   function setIdText(id: string, value: string | number | undefined) {
      document.getElementById(id)!.textContent =
        value == undefined ? "undefined" : value + "";
    } */
  const setHeaderHeight = useCallback((value?: number) => {
    if (gridRef !== null) {
      gridRef.current!.api.setGridOption("headerHeight", value);
      //setIdText("headerHeight", value);
    }
    else {
      gridRefDefault.current!.api.setGridOption("headerHeight", value);
      //setIdText("headerHeight", value);
    }
  }, []);
  const defaultColDef = useMemo(() => {
    return {
      initialWidth: ag_data.columnWidth ?? 100,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      editable: true,
      floatingFilter: ag_data.showFilter ?? true,
      filter: true,
      headerCheckboxSelectionFilteredOnly: true,
    };
  }, []);
  const defaultColumns = useMemo(() => {
    if(ag_data.data.length > 0){
      let keys = Object.keys(ag_data.data[0]);    
      return keys.map((key) => {        
        return {field: key,
          headerName: key,
          width: ag_data.columnWidth ?? 100}        
      })
    }  
    else return []  
  },[ag_data.data])


 

  const pivotDatasourcefiels = useMemo(() => {
    if(ag_data.data.length > 0){
      let keys = Object.keys(ag_data.data[0]);    
      return keys.map((key) => {        
        return {
          caption: key,
          width: 80,
          dataField: key,
          allowSorting: true,
          allowFiltering: true,          
          summaryType: "sum",
          format: "fixedPoint",
          headerFilter: {
            allowSearch: true,
            height: 500,
            width: 300,
          },
        }        
      })
    } 
    else {
      return [] 
    } 
  },[ag_data.data])


 let pvdts =  new PivotGridDataSource({
    fields: pivotDatasourcefiels,
    store: ag_data.data,
  })


  const onExportClick = () => {
    if (gridRef !== null) {
      gridRef.current!.api.exportDataAsCsv();
    }
    else {
      gridRefDefault.current!.api.exportDataAsCsv();
    }
  };
  // Định nghĩa kiểu dữ liệu đầu vào
  interface RowData {
    name: string;
    age: number;
    country: string;
  }
  interface FilteredRow {
    [key: string]: any; // Key là headerName, giá trị là dữ liệu tương ứng
  }
  /**
   * Lấy các dòng đang được lọc và hiển thị từ AG Grid
   * @param gridApi - GridApi từ AG Grid
   * @returns Mảng các dòng đã lọc với key là headerName
   */
  const getFilteredDisplayedRows = (gridApi: GridApi<RowData> | null): FilteredRow[] => {
    // Kiểm tra xem gridApi có tồn tại không
    if (!gridApi) {
      console.warn('GridApi chưa được khởi tạo.');
      return [];
    }
    // Lấy các cột đang hiển thị từ GridApi
    const displayedColumns = (gridApi.getColumnDefs() || [])
      .filter((col): col is ColDef<RowData> => {
        // Kiểm tra xem col có phải là ColDef không (loại bỏ ColGroupDef)
        return 'field' in col && col.hide !== true;
      })
      .map((col) => ({
        field: col.field as keyof RowData,
        headerName: col.headerName || col.field || '',
      }));
    // Lấy dữ liệu đã lọc và hiển thị
    const filteredRows: FilteredRow[] = [];
    gridApi.forEachNodeAfterFilter((node) => {
      const row: FilteredRow = {};
      displayedColumns.forEach((col) => {
        row[col.headerName] = node.data?.[col.field];
      });
      filteredRows.push(row);
    });
    return filteredRows;
  };
 
  useEffect(() => {
  }, [])
  return (
    <div className='agtable'>
      {ag_data.toolbar !== undefined && <div className="toolbar" style={{ backgroundImage: 'white' }}>
        {ag_data.toolbar}
        <IconButton
          className="buttonIcon"
          onClick={() => {
            //onExportClick();
            //onExportExcelClick();
            let kq = gridRef ? getFilteredDisplayedRows(gridRef?.current?.api!) : getFilteredDisplayedRows(gridRefDefault?.current?.api!);
            //console.log(kq);
            SaveExcel(kq, "Data Table");
          }}
        >
          <AiFillFileExcel color="green" size={15} />
          EX1
        </IconButton>
        <IconButton
          className="buttonIcon"
          onClick={() => {
            SaveExcel(ag_data.data, "Data Table");
          }}
        >
          <AiFillFileExcel color="green" size={15} />
          EX2
        </IconButton>
        <IconButton
          className="buttonIcon"
          onClick={() => {
            setShowHidePivotTable(!showhidePivotTable);
          }}
        >
          <MdOutlinePivotTableChart color="#ff33bb" size={15} />
          PIVOT
        </IconButton>
      </div>}
      <div className="ag-theme-quartz">
        <AgGridReact
          rowDragManaged={true} // Bật tính năng kéo hàng
          animateRows={true}
          rowData={ag_data.data ?? []}
          columnDefs={ag_data.columns ?? defaultColumns}
          rowHeight={ag_data.rowHeight ? ag_data.rowHeight : 25}
          defaultColDef={defaultColDef}
          ref={gridRef ?? gridRefDefault}
          onGridReady={() => {
            setHeaderHeight(20);
          }}
          columnHoverHighlight={true}
          rowStyle={rowStyle}
          getRowStyle={ag_data.getRowStyle ?? getRowStyle}
          getRowId={(params: any) => params.data.id?.toString() ?? params.data.id}
          rowSelection={"multiple"}
          rowMultiSelectWithClick={false}
          suppressRowClickSelection={ag_data.suppressRowClickSelection ?? true}
          enterNavigatesVertically={true}
          enterNavigatesVerticallyAfterEdit={true}
          stopEditingWhenCellsLoseFocus={true}
          rowBuffer={10}
          debounceVerticalScrollbar={false}
          enableCellTextSelection={true}
          floatingFiltersHeight={23}
          onSelectionChanged={(params: any) => {
            ag_data.onSelectionChange(params);
            tableSelectionChange();
          }}
          onRowClicked={ag_data.onRowClick}
          onRowDoubleClicked={ag_data.onRowDoubleClick ?? onRowdoubleClick}
          onRowDragMove={(e) => { }}
          onRowDragEnd={ag_data.onRowDragEnd ?? onRowDragEnd}
          onCellEditingStopped={ag_data.onCellEditingStopped}
          onCellClicked={ag_data.onCellClick}
        />
      </div>
      <div className="bottombar">
        <div className="selected">
          {selectedrow !== 0 && <span>
            Selected: {selectedrow}/{ag_data.data.length} rows
          </span>}
        </div>
        <div className="totalrow">
          <span>
            Total: {ag_data.data.length} rows
          </span>
        </div>
      </div>
      {showhidePivotTable && (
          <div className="pivottable1">
            <IconButton
              className="buttonIcon"
              onClick={() => {
                setShowHidePivotTable(false);
              }}
            >
              <AiFillCloseCircle color="blue" size={15} />
              Close
            </IconButton>
            <PivotTable
              datasource={pvdts}
              tableID="datasxtablepivot"
            />
          </div>
        )}       
    </div>
  )
});
export default AGTable