import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { postProductToCart } from "../reducer/addToCart";
import { getProductFromCart } from "../reducer/addToCart";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

const cookies = new Cookies();
const token = cookies.get("token");
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const { id, heading, img, description, price } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const add = async () => {
    if (token) {
      const data = {
        id: id,
        count: 1,
        name: heading,
        price: price,
      };
      await dispatch(postProductToCart({ data, userId: token }));
      dispatch(getProductFromCart(token));
    } else {
      history.push("auth/signIn");
    }
  };
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {heading}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price:{price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            add();
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
