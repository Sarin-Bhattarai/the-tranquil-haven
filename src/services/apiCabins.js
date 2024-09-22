import supabase, { supabaseUrl } from "./supabase";

//For Getting all cabins
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

//For Editing & Creating cabin
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  //1. For creating new cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //2. For editing cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //Delete the cabin if there is error while uploading
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded & cabin was not created"
    );
  }
  return data;
}

//For Deleting a cabin
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}

//create cabin
// export async function createEditCabin(newCabin) {
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   //Create cabin
//   const { data, error } = await supabase
//     .from("cabins")
//     .insert([{ ...newCabin, image: imagePath }])
//     .select();

//   if (error) {
//     console.error(error);
//     throw new Error("Cabin could not be created");
//   }

//   //Upload image
//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newCabin.image);

//   //Delete the cabin if there is error while uploading
//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     throw new Error(
//       "Cabin image could not be uploaded & cabin was not created"
//     );
//   }
//   return data;
// }
