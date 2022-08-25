import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styles from './filter.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setIsFilter } from '../../redux/slices/Programs';

const Filter = () => {
  const dispatch = useDispatch();
  const filters = ['Man', 'Wooman', 'Home'];
  const { filter } = useSelector((store) => store.programs);
  const changeFilter = (value) => {
    dispatch(setIsFilter(value));
  };

  return (
    <div className={styles.filter}>
      <Stack direction="column" spacing={3}>
        {filters.map((value, index) => (
          <Button
            key={index}
            variant={filter === value.toLowerCase() ? 'contained' : 'outlined'}
            className="filter-block__button"
            onClick={() => changeFilter(value.toLowerCase())}>
            {value}
          </Button>
        ))}
      </Stack>
    </div>
  );
};

export default Filter;
