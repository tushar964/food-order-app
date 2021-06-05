import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      const Response = await fetch(
        "https://react-f42f6-default-rtdb.firebaseio.com/meals.json"
      );
      // console.log("tt", Response);
      if (!Response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await Response.json();
      const loadedMeals = [];
      //console.log("tt", loadedMeals, responseData);
      for (const key in responseData) {
        // console.log("y", key);
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    //console.log("tt", loadedMeals);
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  // const DUMMY_MEALS = [
  //   {
  //     id: "m1",
  //     name: "Sushi",
  //     description: "Finest fish and veggies",
  //     price: 22.99,
  //   },
  //   {
  //     id: "m2",
  //     name: "Schnitzel",
  //     description: "A german specialty!",
  //     price: 16.5,
  //   },
  //   {
  //     id: "m3",
  //     name: "Barbecue Burger",
  //     description: "American, raw, meaty",
  //     price: 12.99,
  //   },
  //   {
  //     id: "m4",
  //     name: "Green Bowl",
  //     description: "Healthy...and green...",
  //     price: 18.99,
  //   },
  // ];
  // console.log("tt", DUMMY_MEALS);
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  // console.log("tk", );
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
