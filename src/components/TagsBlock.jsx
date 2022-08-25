import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { SideBlock } from './SideBlock';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTag } from '../redux/slices/posts';

export const TagsBlock = ({ items, isLoading = true }) => {
  const dispatch = useDispatch();
  const { activeTag } = useSelector((store) => store.posts);
  const changeTag = (value) => {
    dispatch(setActiveTag(value));
  };
  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <div key={i} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem key={i} disablePadding onClick={() => changeTag(name)}>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? <Skeleton width={200} /> : <ListItemText primary={name} />}
              </ListItemButton>
            </ListItem>
          </div>
        ))}
      </List>
    </SideBlock>
  );
};
