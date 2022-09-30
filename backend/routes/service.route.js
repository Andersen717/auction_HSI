const router = require("express").Router();
// service Model
let studentSchema = require("../models/Service");
// CREATE service
router.post("/create-service", (req, res, next) => {
    studentSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            console.log("Service created successfully.", data);
            res.json(data);
        }
    });
});
// READ service
router.get("/", (req, res) => {
    studentSchema.find((error, data, next) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});
// get Document
router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    console.log('update service id', id)
    studentSchema.findById(
        id, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        });
})
// Update service Data
router.put("/update-service/:id", (req, res, next) => {
    studentSchema.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
                console.log("Service updated successfully !");
            }
        }
    );
});
// Delete service
router.delete("/delete-service/:id",
    (req, res, next) => {
        studentSchema.findByIdAndRemove(
            req.params.id, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.status(200).json({
                        msg: data,
                    });
                }
            });
    });
module.exports = router;