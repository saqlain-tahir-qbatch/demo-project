import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import ProductIcon from'@mui/icons-material/ProductionQuantityLimits'
import { useDispatch, useSelector } from "react-redux";
import { getProductWithFilter } from "../reducer/showProduct";
import { Input } from '@mui/material';
import { setFilter } from '../reducer/showProduct';
import { updateDescription } from '../reducer/showProduct';
import { setPagination } from '../reducer/showProduct';
import { debounce } from 'lodash'


const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Title',
  },
  {
    id: 'asin',
    numeric: true,
    disablePadding: false,
    label: 'Asin',
  },
  {
    id: 'desc',
    numeric: true,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'quantity',
    numeric: true,
    disablePadding: false,
    label: 'Quantity',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } =
    props;
  

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
          {headCell.label}
          </TableCell>

        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};



const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;
  

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Inventory
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <ProductIcon/>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


export default function Inventory() {
  const [selected, setSelected] = useState([]);
  const [description, setDescription] = useState(null)
  const [rowId, setRowId] = useState(0)
  const {Productlist:list, productsCount, pagination} = useSelector((state) => state.Products);
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getProductWithFilter());

  }, [pagination.rowsPerPage, pagination.pageNumber]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = list.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    const paginate = {
     pageNumber:newPage,
     rowsPerPage: pagination.rowsPerPage
    }
    dispatch(setPagination(paginate));
    dispatch(getProductWithFilter())
  };

  const handleChangeRowsPerPage = (event) => {
    const paginate = {
      pageNumber:0,
      rowsPerPage: parseInt(event.target.value, 10),
     }
     dispatch(setPagination(paginate));
  };
  
  const hanldeStartDescriptionEdit = (id, description) => {
    setRowId(id);
    setDescription(description);
  }

  const handleOnDescriptionChange = (event) => {
    const {value} = event.target;
    setDescription(value);
  }

  const onSetFilter = debounce((event) => {
    const keyword= event.target.value
    if(keyword.length && keyword.trim() === "") {
      return;
    }
    const filter = {
       field: "keyword",
       value: keyword.trim(),
       filterType: 'text'
    }
    
    dispatch(setFilter(filter))
    dispatch(getProductWithFilter());
    const paginate = {
      pageNumber:0,
      rowsPerPage: pagination.rowsPerPage
     }
    dispatch(setPagination(paginate));
    
   },1000)

   const hanldeStopDescriptionEdit = async (id) => {
    const value= description;
    setRowId('');
    dispatch(updateDescription({id, value}));
    dispatch(getProductWithFilter());
   }
  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <div style={{textAlign:'right'}}>
      <Input sx={{ width: '23.5%' , paddingTop:'10px' }} placeholder="Search title or asin for products" onChange={(event) => onSetFilter(event)}></Input>
      </div>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ height: '90vh' }}>
          <Table
            sx={{ minWidth: 750, }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={list.length}
            />
            <TableBody>
              {list && list
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const {name, id, description, price, quantity} = row
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {name}
                      </TableCell>
                      <TableCell align="right">{id} </TableCell>
                      <TableCell align="right">
                        { rowId == id ? (
                          <>
                          <input defaultValue={description} onChange={(event) => handleOnDescriptionChange(event)}  />
                          <CheckIcon style={{height:'16px', verticalAlign:'text-bottom'}} onClick={() => hanldeStopDescriptionEdit(id, description)}/>
                          </>
                        ):
                        <>
                        {description} 
                        <EditIcon style={{height:'16px', verticalAlign:'text-bottom'}} onClick={() => hanldeStartDescriptionEdit(id)}/>
                        </>
                       }
                       
                      </TableCell>
                      <TableCell align="right">{price}</TableCell>
                      <TableCell align="right">{quantity}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={productsCount}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.pageNumber}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
