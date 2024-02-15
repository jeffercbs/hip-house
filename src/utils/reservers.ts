const API = import.meta.env.DEV ? "http://localhost:4321" : "https://hip-house.vercel.app";

export const deleteReserver = async (id: string) => {
    const res = await fetch(`${API}/api/reserves?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return res.json();
}