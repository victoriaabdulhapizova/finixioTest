import React, { useEffect, useState, useMemo } from 'react'

import { DataGrid } from '@mui/x-data-grid';
import { fetchCryptocurrencies } from "../utils/fetchCurrency";

import './TableDisplay.scss';

const pageSize = 10;
const pageSizeOptions = [pageSize];
const INITIALSTATE = [
  {
    field: 'priceIncrease',
    sort: 'desc',
  },
]

const TableDisplay = (props) => {
  const { currency = 'USD' } = props;
  const [sortModel, setSortModel] = useState(INITIALSTATE);
  const [rows, setRows] = useState([]);

  const columns = useMemo(
    () =>
      [
        {
          field: "name",
          headerName: "Coin Name",
          flex: 1,
          disableColumnMenu: true,
          headerClassName: 'table-cell',
          cellClassName: 'table-cell',
        },
        {
          field: "price",
          headerName: `Current Price (${currency})`,
          flex: 1,
          disableColumnMenu: true,
          headerClassName: 'table-cell',
          cellClassName: 'table-cell',
        },
        {
          field: "openPrice",
          headerName: `Opening price (${currency})`,
          flex: 1,
          disableColumnMenu: true,
          headerClassName: 'table-cell',
          cellClassName: 'table-cell',
        },
        {
          field: "priceIncrease",
          headerName: "Price Increase",
          flex: 1,
          disableColumnMenu: true,
          valueGetter: (params) => {
            const currentPrice = params.getValue(params.id, 'price');
            const openPrice = params.getValue(params.id, 'openPrice');
            const priceDiff = currentPrice-openPrice;
            return `${(priceDiff/openPrice*100).toFixed(3)}%(${priceDiff.toFixed(2)} ${currency})`
          },
          headerClassName: 'table-cell',
          cellClassName: 'table-cell',
        },
      ],
    [currency]
  );

  useEffect(() => {
    const fetchCryptocurrenciesData = async () => {
      const { RAW } = await fetchCryptocurrencies(currency);
      const res = Object.entries(RAW).map(([key, { [currency]: val }]) => ({ name: key, price: val.PRICE, openPrice: val.OPENHOUR, id: key }));
      setRows(res);
    }
  
    fetchCryptocurrenciesData();
  }, [currency]);


  return (
    <div className="table-container" id="table-container">
      <DataGrid
        className="table"
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={pageSizeOptions}
        loading={!rows.length}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        disableSelectionOnClick
      />
    </div>
  )
}

export default React.memo(TableDisplay);
