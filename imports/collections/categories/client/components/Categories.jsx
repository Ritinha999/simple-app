import React, { useState } from "react";
import { IconButton, TextField, Button, Icon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import { LoadingScreen } from "../../../../ui/LoadingScreen";
import { useCategories } from "../hooks/useCategories";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const handleDeleteClick = (category) => {
  Meteor.call("categories.remove", category._id);
};

//{category.createdAt}{" "}
/*sx={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 1,
  border: "1px solid #ccc",
  borderRadius: "4px",
}} */

const CategoryItem = ({ category }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardHeader
          avatar=
          {
            <Avatar sx={{ }}>
              {category.title[0]}
            </Avatar>
          }
          action=
          {
            <IconButton aria-label="settings" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          }
          title={category.title}
          subheader={category.createdAt.toLocaleDateString()}
          >
        </CardHeader>
      </Card>
    </Grid>
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
        sx={{ display: "flex", gap: 2, alignItems: "center", mb: 6 }}
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

      <Grid container spacing={3}>
        {categories.map((category, index) => {
          return <CategoryItem key={index} category={category} />;
        })}
      </Grid>
    </Box>
  );
};
