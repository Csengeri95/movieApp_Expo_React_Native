const express = require('express')
const app = express()
const cors = require('cors')
const port = 8000

const DATA = require('./data');


app.use(cors())


app.get('/api/data', (req, res) => {

    res.json(DATA)
})

app.get('/api/database/videoId/:id', (req, res) => {

    const itemId = req.params.id
    const item = DATA.map(a => a.data.find(item => item.id === itemId)).find(Boolean);


    if (item) {
        res.json({
            title: item.title,
            type: item.type,
            videoId: item.videoId
        })
    } else {
        res.status(404).json({ error: 'Az adott elem nem található!' })
    }

})


app.listen(port, () => {
    console.log(`A szerver a ${port}-on fut`)

})