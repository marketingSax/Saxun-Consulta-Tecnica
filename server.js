app.get('/', (req, res) => {
  res.sendFile('./static/index.html');
});

app.get('/static/*', (req, res) => {
  res.sendFile(req.path);
});
