import { ref } from "vue";

export async function usePostFetch(url, payload) {
  const data = ref(null);
  const error = ref(null);

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    // console.log("json", json);
    data.value = json;
  } catch (err) {
    error.value = err;
  }

  return { data, error };
}
