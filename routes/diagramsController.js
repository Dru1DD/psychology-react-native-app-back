const ListOfDiagrams = require('../model/ListOfDiagrams')

// Контроллер для получения диаграмм
class diagramsController {
    async saveDiagrams(req, res) {
        try {
            const { email } = req.body
            const diag = {
                countOfParts: req.body.countOfParts,
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
    async getDiag (req, res) {
        try {
            const { email } = req.body
            const diag = await ListOfDiagrams.find({ email })
            res.json(diag)
        } catch(e) {
            console.log(e)
            res.status(400).json({ message: "Не удалось получить список выполненых тестов для данного пользователя"})
        }
    }
}

module.exports = new diagramsController()