import React, { useState } from 'react';
import { IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Menu.css'

function Menu() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };
    
  
    return (
        <div className="Menu">
            <div className="Icon">
                <IconButton onClick={toggleDrawer}>
                    <MenuIcon sx={{ fontSize: 40, color: 'var(--branco)' }}/>
                </IconButton>
            </div>
            <Drawer open={drawerOpen} PaperProps={{ className: 'drawer' }} onClose={toggleDrawer}>
                <IconButton onClick={toggleDrawer}>
                    <MenuIcon sx={{ fontSize: 40, color: 'var(--branco)', marginLeft: -17.5, marginTop: -2.5 }}/>
                </IconButton>
                <List>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="ADMINISTRAÇÃO" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="ARTE" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="ARTESANATO" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="AUTOAJUDA" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="BIOGRAFIAS" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="REAIS" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="CIÊNCIAS" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="COMPUTAÇÃO" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="CRÔNICAS" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="DIREITO" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="EDUCAÇÃO" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="ENGENHARIA" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="ESPORTES" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="FANTASIA" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="GASTRONOMIA" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="HISTÓRIA" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="HQ" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="NOVELS" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="INFANTIL" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="LGBTQ+" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="LITERATURA" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="MANGÁS" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="MEDICINA" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="POLICIAL" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="CIÊNCIAS SOCIAIS" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="RELIGIÃO" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="ROMANCE" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="SAÚDE" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="SUSPENSE" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="TURISMO" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="VIAGEM" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="INGLÊS" />
                </ListItem>
                <ListItem className="drawer-item">
                    <ListItemText className="drawer-text" primary="JOVENS" />
                </ListItem>
                </List>
            </Drawer>
        </div>
    );
  }
  
  export default Menu;
  