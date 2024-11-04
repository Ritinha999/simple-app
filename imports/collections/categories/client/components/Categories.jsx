import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { LoadingScreen } from "../../../../ui/LoadingScreen";
import { useCategories } from "../hooks/useCategories";

const handleDeleteClick = (category) => {
  Meteor.call("categories.remove", category._id);
};

const CategoryItem = ({ category }) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleDeleteClick(category)}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemIcon>
      </ListItemIcon>
      <ListItemText
        primary={category.text}
        sx={{ textDecoration: category.isChecked ? "line-through" : "none" }}
      />
    </ListItem>
  );
};

export const Categories = ({}) => {
  const [text, setText] = useState("");
  const { categories, loading } = useCategories();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    setText("");

    Meteor.call("categories.insert", text, (err) => {
      if (err) {
        console.log(err);
        alert(err);
      }
    });
  };

  if (loading) {
    return <LoadingScreen></LoadingScreen>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: "75vh",
        padding: 10,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}
      >
        <TextField
          label="New Category"
          variant="outlined"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type to add new categories"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ height: "56px" }}
        >
          Add Category
        </Button>
      </Box>

      <List>
        {categories.map((category, index) => {
          return <CategoryItem key={index} category={category} />;
        })}
      </List>
    </Box>
  );
};