function status(request, response) {
  response.status(200).json({ mensagem: "são acima da média" });
}

export default status;
