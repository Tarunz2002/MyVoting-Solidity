// Initialize Web3
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

// Replace this with the actual deployed contract address
const contractAddress = "YOUR_CONTRACT_ADDRESS";

// Replace this with the actual contract ABI
const contractABI = [...];

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Load candidate list on page load
window.addEventListener("load", async () => {
  const candidateList = await contract.methods.getCandidateList().call();
  const selectElement = document.getElementById("candidateList");

  for (let i = 0; i < candidateList.length; i++) {
    const option = document.createElement("option");
    option.text = web3.utils.hexToString(candidateList[i]);
    selectElement.add(option);
  }
});

// Vote for the selected candidate
async function vote() {
  const selectedCandidate = document.getElementById("candidateList").value;
  await contract.methods.voteForCandidate(web3.utils.stringToHex(selectedCandidate)).send({ from: "YOUR_METAMASK_ADDRESS" });
  updateVotes(selectedCandidate);
}

// Update the total votes for the selected candidate
async function updateVotes(candidate) {
  const votes = await contract.methods.totalVotesFor(web3.utils.stringToHex(candidate)).call();
  document.getElementById("votes").innerText = votes;
}