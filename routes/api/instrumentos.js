const router = require('express').Router();
const Sequelize = require('sequelize');
//Me traigo el modelo instrumento
const { Instrumento } = require('../../db');

const Op = Sequelize.Op;

//Todas las peticiones que entran acá ya tienen el prefijo /api/instrumentos



router.get('/', async (req, res) => {
    const instrumentos = await Instrumento.findAll();
    res.json(instrumentos);
});

router.get('/:instrumentoId', async (req, res) => {
    const instrumento = await Instrumento.findByPk(req.params.instrumentoId);
    res.json(instrumento);
});

router.get('/buscar/:termino', async (req, res) => {
    const instrumentos = await Instrumento.findAll({
        where: {
            instrumento: {
                [Op.like]: `%${req.params.termino}%`
            }
        }
    });
    res.json(instrumentos);
});

router.get('/precios/query', async (req, res) => {
    const min = parseFloat(req.query.min);
    const max = parseFloat(req.query.max);
    const instrumentos = await Instrumento.findAll({
        where: {
            precio: {
                [Op.between]: [min, max]
            }
        }
    });
    res.json(instrumentos);
}); 

/* router.get('/precios/query', async (req, res) => {
    const min = req.query.min;
    const max = req.query.max;
    con.connect(function(err) {
        if (err) throw err;
        con.query('SELECT * FROM instrumentosdb.instrumentos where precio between" + min + "and" + max";"', function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
      });
    res.json(result);
}); */

router.post('/', async (req, res) => {
    const instrumento = await Instrumento.create(req.body);
    res.json(instrumento);
});

router.put('/:instrumentoId', async (req, res) => {
    await Instrumento.update(req.body, {
        where: {id: req.params.instrumentoId}
    });
    res.json({success: 'Instrumento modificado'})
    
});

router.delete('/:instrumentoId', async (req, res) => {
    await Instrumento.destroy({
        where: {id: req.params.instrumentoId}
    });
    res.json({success: 'instrumento borrado'});
});

module.exports = router;