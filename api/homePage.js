const homePage = `
<html>
  <head>OVC-API</head>
  <body>
    <h1>OVC-API</h1>
    <a href="/generate">
      <button>Generate</button>
    </a>
    <a href="/destroy">
      <button>Destroy</button>
    </a>
    <br>
    <br>
    <form id="addDoctorForm">
      <label>Add Doctor</label>
      <input type="text" id="doctorName" name="doctorName" required />
      <button type="submit">Submit</button>
    </form>
    <br>
    <br>
    <form id="deleteDoctorForm">
      <label>Delete Doctor Id</label>
      <input type="text" id="doctorId" name="doctorId" required />
      <button type="submit">Submit</button>
    </form>

    <script>
      document.getElementById("addDoctorForm").addEventListener('submit', async (e) => {
        e.preventDefault();
        const doctorName = document.getElementById("doctorName").value;

        try {
          const res = await fetch("/add-doctor", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ doctorName }),
          });
        } catch (err) {
          console.error('add-doctor post err', err);
        }
      });

      document.getElementById("deleteDoctorForm").addEventListener('submit', async (e) => {
        try {
          e.preventDefault();
          const doctorId = parseInt(document.getElementById("doctorId").value);

          const res = await fetch("/delete-doctor", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ doctorId }),
          });
        } catch (err) {
          console.error('add-doctor post err', err);
        }
      });
    </script>
  </body>
</html>
`;

export default homePage;
