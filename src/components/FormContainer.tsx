import { useEffect, useState } from "preact/hooks";

export function FormContainer(props: any) {
  const [errorMessage, seterrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);

  async function submit(e: SubmitEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/reserves", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      setSuccessMessage(data.message);
    } else {
      seterrorMessage(data.error);
    }
  }

  useEffect(() => {}, [errorMessage, successMessage]);

  useEffect(() => {
    if (props.session) {
      setDisabled(false);
    }
  }, []);

  return (
    <form
      onSubmit={submit}
      class="py-12 md:px-8 px-6 border-2 border-orange-950 shadow-2xl shadow-orange-600/40 rounded-lg"
    >
      {props.children}
      <button
        type="submit"
        disabled={disabled}
        class="w-full disabled:opacity-40 border-2 border-primary bg-orange-200 text-primary hover:bg-primary hover:text-orange-100 py-3 px-2 rounded-lg hover:shadow-2xl hover:shadow-orange-500/30"
      >
        Rervar ahora mismo
      </button>

      <div class="mt-3">
        {errorMessage && (
          <p class="text-red-100 bg-red-600 roudned-lg p-3">{errorMessage}</p>
        )}
        {successMessage && (
          <p class="p-3 text-green-100 bg-green-600 rounded-lg">
            {successMessage}
          </p>
        )}
      </div>
    </form>
  );
}
