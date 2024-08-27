import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';
import { Forum as ForumIcon } from '@mui/icons-material';

interface Category {
  id: bigint;
  name: string;
}

interface CategoryGridProps {
  categories: Category[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id.toString()}>
            <Paper
              component={Link}
              to={`/category/${category.id}`}
              elevation={3}
              sx={{
                p: 2,
                textAlign: 'center',
                color: 'text.secondary',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ForumIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">{category.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CategoryGrid;
