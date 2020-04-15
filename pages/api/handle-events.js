export default async (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(`Error: ${err.message}`);

    res.status(400).json({
      error: err.message,
    });
  }
};
