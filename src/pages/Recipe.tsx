import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Recipe() {
  const params = useParams().name;
  const [recipe, setRecipe]: any = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("instruction");

  useEffect(() => {
    getRecipe();
  }, []);

  const getRecipe = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${params}/information?apiKey=${
        import.meta.env.VITE_SOME_KEY
      }`
    );

    setRecipe(response.data);
    setLoading(false);
  };

  if (loading) {
    return (
      <h1 className="text-3xl  text-center mt-20 font-medium">loading...</h1>
    );
  }
  return (
    <div className=" flex flex-col justify-between items-center mb-44">
      <h1 className="text-center text-4xl font-semibold my-10">
        {recipe.title}
      </h1>
      <img
        loading="lazy"
        className="mx-auto"
        src={recipe.image}
        alt={recipe.title}
      />
      <button
        className={
          activeTab === "instruction"
            ? "hidden"
            : "py-5 px-10 bg-slate-400 rounded-md my-10 w"
        }
        onClick={() => setActiveTab("instruction")}
      >
        Instructions
      </button>
      <button
        className={
          activeTab === "ingredients"
            ? "hidden"
            : "py-5 px-10 bg-slate-400 rounded-md my-10 text-center"
        }
        onClick={() => setActiveTab("ingredients")}
      >
        Ingredients
      </button>
      {activeTab === "instruction" && (
        <div>
          <h3
            className="font-medium text-xl mb-5"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          ></h3>
          <h3
            className="font-medium text-xl"
            dangerouslySetInnerHTML={{ __html: recipe.instructions }}
          ></h3>
        </div>
      )}
      {activeTab === "ingredients" && (
        <ul className="self-start text-xl font-semibold">
          {recipe.extendedIngredients.map((ingredient: any) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Recipe;
