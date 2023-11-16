/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MailIcon from '@mui/icons-material/Mail';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomList = ({ title, items }) => {
  const [isCollapse, setIsCollapse] = useState(false);

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  return (
    <List>
      <ListItem disablePadding sx={{ display: 'block' }} onClick={handleCollapse}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: 'space-between',
            px: 2.5,
            opacity: isCollapse ? 0.7 : 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary={title} sx={{ opacity: 1 }} />
          </div>
          {isCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse in={isCollapse} timeout='auto' unmountOnExit>
        {items.map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: 'space-between',
                px: 2.5,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <SummarizeIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: 1 }} />
              </div>
            </ListItemButton>
          </ListItem>
        ))}
      </Collapse>
    </List>
  );
};

export default CustomList;
