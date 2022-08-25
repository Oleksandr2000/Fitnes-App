import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Filter from '../components/Filter';
import Programs from '../components/Programs';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Post } from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrograms, setPrograms } from '../redux/slices/Programs';
import { selectIsAuth } from '../redux/slices/User';

export const Training = () => {
  const dispatch = useDispatch();
  const { programs, status, filter } = useSelector((store) => store.programs);
  const { access } = useSelector((store) => store.user);
  const { data } = useSelector((store) => store.user);
  const [value, setValue] = React.useState(0);

  const handlerChange = (event, newValue) => {
    setValue(newValue);
  };

  const isAuth = useSelector(selectIsAuth);

  const isProgramsLoading = status === 'loading';

  React.useEffect(() => {
    const activeFilter = filter ? filter : '';

    dispatch(fetchPrograms(activeFilter));
  }, [filter]);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={value}
        onChange={handlerChange}
        aria-label="basic tabs example">
        <Tab label="Популярные" />
        {isAuth ? <Tab label="Мої програми" /> : null}
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isProgramsLoading
            ? [...Array(2)]
            : value === 0
            ? programs
            : programs.filter((item) => Boolean(item._id) === data.access.includes(item._id))
          ).map((obj, index) =>
            isProgramsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Programs
                key={obj._id}
                _id={obj._id}
                title={obj.title}
                description={obj.description}
                coach={obj.coach}
                imgUrl={obj.imageUrl}
                price={obj.price}
              />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          <Filter />
        </Grid>
      </Grid>
    </>
  );
};
