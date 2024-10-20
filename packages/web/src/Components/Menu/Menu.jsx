import React, { useState, useEffect } from 'react';
import { IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import api from '../../services/axios';
import { apiBaseUrl } from '../../../externalUrls';
import './Menu.css'

function Menu() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const buscarCategorias = async () => {
            try {
                const response = await api.get(`${apiBaseUrl}/books/categories`);
                if (response.data.success && Array.isArray(response.data.data)) {
                    const categoriasOrdenadas = response.data.data.sort((a, b) => 
                        a.category.localeCompare(b.category)
                    );
                    setCategorias(categoriasOrdenadas);
                } else {
                    console.error('Formato de resposta inválido:', response.data);
                    setCategorias([]);
                }
            } catch (erro) {
                console.error('Erro ao buscar categorias:', erro);
                setCategorias([]);
            }
        };

        buscarCategorias();
    }, []);

    const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };

    const handleCategoriaClick = (categoria) => {
      console.log('Categoria selecionada:', categoria);
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
                    {categorias.map((categoria) => (
                        <ListItemButton 
                            key={categoria.category_id} 
                            className="drawer-item" 
                            onClick={() => handleCategoriaClick(categoria.category)}
                        >
                            <ListItemText className="drawer-text" primary={categoria.category} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}

export default Menu;
