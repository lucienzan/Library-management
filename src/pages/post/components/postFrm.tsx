import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Resources } from "../../../types/resources";
import { VPostSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "../../../types/categories";
import { useEffect, useState } from "react";

type Props = {
  categories: Category[];
  onSubmit: SubmitHandler<Resources>;
  pageName: "create" | "edit";
};

const PostFrm: React.FC<Props> = (props: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const methods = useForm<Resources>({
    reValidateMode: "onSubmit",
    resolver:
      props.pageName == "edit"
        ? zodResolver(VPostSchema)
        : zodResolver(VPostSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    setCategories(props.categories);
  },[categories,props.categories])

  const PostFrmView = () => {
    return (
      <>
        <div className="space-y-3">
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="post title"
          />
          {errors.title && (
            <span className=" text-sm text-red-500">
              {errors.title.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
              id="description"
              {...register("description")}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            ></textarea>
            {errors.description && (
            <span className=" text-sm text-red-500">
              {errors.description.message}
            </span>
          )}
          </div>
          {categories && categories.map(data => {
            return (
            <div className="flex items-center mb-4" key={data.id}>
                <input id={data.name} type="checkbox" {...register("categories")} value={data.id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor={data.name} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{data.name}</label>
            </div>
            )
          })}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Submit
        </button>
        </div>
      </>
    );
  };
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(props.onSubmit)}>
          <PostFrmView />
        </form>
      </FormProvider>
    </>
  );
};

export default PostFrm;
