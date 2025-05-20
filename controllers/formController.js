const fs = require('fs');
const filePath = './data/entries.json';

let entries = [];

function loadEntries() {
  try {
    const data = fs.readFileSync(filePath);
    entries = JSON.parse(data);
  } catch (err) {
    entries = [];
  }
}
function saveEntries() {
  fs.writeFileSync(filePath, JSON.stringify(entries, null, 2));
}

loadEntries();

exports.getForms = (req, res) => {
  res.json(entries);
};

exports.submitForm = (req, res) => {
  const { name,email, age, gender, feedback } = req.body;
  if (!name || !email || !age || !gender || !feedback) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newEntry = { id: Date.now(), name, email, age, gender, feedback };
  entries.push(newEntry);
  saveEntries();
  res.status(201).json({ message: 'Form submitted successfully', data: newEntry });
};

exports.deleteForm = (req, res) => {
  const id = parseInt(req.params.id);
  entries = entries.filter(e => e.id !== id);
  saveEntries();
  res.json({ message: 'Entry deleted' });
};

exports.updateForm = (req, res) => {
  const id = parseInt(req.params.id);
  const index = entries.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ error: 'Entry not found' });

  const updatedEntry = { ...entries[index], ...req.body };
  entries[index] = updatedEntry;
  saveEntries();
  res.json({ message: 'Entry updated', data: updatedEntry });
};
