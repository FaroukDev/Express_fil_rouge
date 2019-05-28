const connection = require('./conf');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/api/wilders', (req, res) => {

    // connection à la base de données, et sélection des employés
    connection.query('SELECT * from wilders', (err, results) => {

        if (err) {

          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de la récupération des employées');
        }else{

          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          res.json(results);
        }
      });


  });

  app.get('/api/wilders/description', (req, res) => {

    // connection à la base de données, et sélection des employés
    connection.query('SELECT idwilders, nom, date_entree from wilders', (err, results) => {

        if (err) {

          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de la récupération des employées');
        }else{

          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          res.json(results);
        }
      });


  });



  app.get('/api/wilders/wcs', (req, res) => {

    // connection à la base de données, et sélection des employés
    connection.query('SELECT nom FROM wilders WHERE nom LIKE"%wcs%"', (err, results) => {

        if (err) {

          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de la récupération des données');

        }else{

          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          res.json(results);
        }
      });


  });

  app.get('/api/wilders/youss', (req, res) => {

    // connection à la base de données, et sélection des employés
    connection.query('SELECT nom FROM wilders WHERE nom LIKE"Youss%"', (err, results) => {

        if (err) {

          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de la récupération des données');
          
        }else{

          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          res.json(results);
        }
      });


  });

  app.get('/api/wilders/date', (req, res) => {

    // connection à la base de données, et sélection des employés
    connection.query(`SELECT date_entree FROM wilders WHERE date_entree >= '2010-10-18'`, (err, results) => {

        if (err) {

          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de la récupération des données');
          
        }else{

          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          res.json(results);
        }
      });


  });


  app.get('/api/wilders/date/:order', (req, res) => {

    let dateAsc = req.params.order
    
    connection.query(`SELECT date_entree FROM wilders ORDER BY date_entree ${dateAsc}`, (err, results) => {
  
      if (err) {
  
        res.status(500).send(`Erreur lors de la récupération des dates par ordre `);
      } else {
  
        res.json(results);
      }
    });
  });

  app.post('/api/post', (req, res) => {


    const formData = req.body;
  
  
    connection.query('INSERT INTO wilders SET ?', formData, (err, results) => {
  
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        console.log(err);
        res.status(500).send("Erreur lors de la sauvegarde des datas");
      } else {
        // Si tout s'est bien passé, on envoie un statut "ok".
        res.sendStatus(200);
      }
    });
  });



 
  app.put('/api/wilders', (req, res) => {

    const idWilders = req.params.id;
    const formData = req.body;
  
    connection.query('UPDATE wilders SET ? WHERE idwilders = ?', [formData, idWilders], err => {
  
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un wilder");
      } else {
        res.sendStatus(200);
      }
    });
  });


  app.put('/api/wilders/toggle/:id', (req, res) => {

    const reactOrNot = req.params.id;    
  
    connection.query(`UPDATE wilders SET isReact = !isReact WHERE idwilders = ?`, reactOrNot, err => {
  
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un wilder");
      } else {
        res.sendStatus(200);
      }
    });
  });


  app.delete('/api/wilders/delete/:id', (req, res) => {

    const dropWilder = req.params.id;
  
    connection.query('DELETE FROM wilders WHERE idwilders = ?', [dropWilder], err => {
  
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la suppression d'un wilder");
      } else {
  
        res.sendStatus(200);
      }
    });
  });

  app.delete('/api/wilders/notReact', (req, res) => {

    
    
    connection.query(`DELETE FROM wilders WHERE react = 0`, err => {
  
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la suppression des wilders non-react");
      } else {
        res.sendStatus(200);
      }
    });
  });

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});