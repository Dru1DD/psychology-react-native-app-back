const ListOfDiagrams = require('../model/ListOfDiagrams')

class diagramsController {
    async saveDiagrams(req, res) {
        try {
            const { email } = req.body
            // let diagramList = await ListOfDiagrams.findOne({ email })
            const diag = {
                mainSegment: req.body.mainSegment,
                anotherSegments: req.body.anotherSegments
            }
            const diagrams = new ListOfDiagrams({
                email: req.body.email,
                diagrams: diag
            })
            let diagramListNew = await ListOfDiagrams.findOneAndUpdate({ email }, {
                $push: {
                    diagrams: diag
                }
            })

            if (diagramListNew) {
                await diagramListNew.save() 
            } else {
                await diagrams.save()
            }
            // console.log(diagramListNew)
            
            // await diagramListNew.save()
            res.status(200).json({message: "SUCCESS"})
        } catch(e) {
            console.log(e)
            res.status(400).json({message: "Ошибка сохранения данных"})
        }
    }

    async getDiagrams (req, res) {
        try {
             const diagrams = await ListOfDiagrams.find()
             res.json(diagrams)
        } catch(e) {
            console.log(e)
            res.status(400).json({message: "Ошибка получения данных"})
        }
    }
}

module.exports = new diagramsController()