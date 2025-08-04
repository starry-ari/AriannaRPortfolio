export default function Contact() {
  return (
    <form
      id="form"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        fetch('/api/timeline_post', {
          method: 'POST',
          body: formData,
        }).then((res) => res.json())
          .then((data) => {
            e.target.reset();
          });
      }}
    >
      <h3>Name:</h3>
      <input type="text" name="name" required />
      <h3>Email:</h3>
      <input type="email" name="email" required />
      <h3>Content:</h3>
      <input type="text" name="content" required />
      <button type="submit">Submit</button>
    </form>
  );
}
