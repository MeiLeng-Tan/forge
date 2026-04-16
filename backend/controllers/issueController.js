const Issue = require ("../models/task")

exports.createTask = async (req,res) => {
    try {
        const newTask = new Issue(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error){
        res.status(400).json({ message: error.message });
    }
};

exports.getTasksByProject = async (req,res) => {
    try {
        const tasks = await Issue.find({ project: req.params.projectID })
            .populate("assignee", "username")
            .sort({ createdAt: -1 })
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteTask = async (req,res) => {
    try {
        const task = await Issue.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (task.createdBy.toString() !== req.body.userId) {
            return res.status(403).json({ message: "Only the creator can delete this task" })
        }

        await Issue.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}