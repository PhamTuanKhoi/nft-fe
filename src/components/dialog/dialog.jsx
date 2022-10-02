import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { updatePower } from "../../apis/projectService";
import { useWeb3 } from "../../contexts/Web3Provider/provider";
import { toast } from "react-toastify";
import { userAPI } from "../../apis/user";
import { useEffect } from "react";
import { useLoading } from "../../hooks/useLoading";

export default function FormDialog({
  id,
  nfts,
  setPower,
  status,
  open,
  setOpen,
  setNft,
}) {
  // const [open, setOpen] = React.useState(false);
  const [vote, setVote] = React.useState({
    value: "",
    power: "",
  });
  // const [minedValue, setMinedValue] = React.useState();
  const { user, setUser } = useWeb3();
  const { setLoading } = useLoading();
  const handleClickOpen = () => {
    if (!user) {
      toast.warn(`Please login in system !`);
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setVote({
      value: "",
    });
  };

  async function handleVote() {
    try {
      if (!user) {
        toast.warn(`Please login in system !`);
        return;
      }

      if (!id) {
        toast.warn(`Project not found !`);
        return;
      }

      if (vote?.power === 0 && vote?.value === 0) {
        toast.warn(`Please vote biger 0`);
        return;
      }

      if (!vote?.power && !vote?.value) {
        toast.warn(`Please enter vote`);
        return;
      }

      setLoading(true);

      const { data } = await updatePower(id, {
        power: vote.power,
        user: user._id,
      });

      setUser(data?.user);

      const nftVote = nfts.map((nft) => {
        if (nft?._id == data.voted._id) {
          return { ...nft, power: data.voted.power };
        }
        return nft;
      });

      setNft(nftVote);

      if (status !== 2) {
        setPower(data?.power);
      }

      //power like project

      toast.success(`Vote project success`);
      setOpen(false);

      setVote({
        power: "",
        value: "",
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  async function handleChangePower(e) {
    if (e > user?.power && user?.power > 0) {
      setVote({
        ...vote,
        power: user?.power?.toFixed(2) < 0.01 ? 0.01 : user?.power?.toFixed(2),
      });
      return;
    }

    if (user?.power === 0) {
      setVote({ ...vote, power: 0 });
      return;
    }

    setVote({ ...vote, power: e });
  }

  let classes = {
    root: {},
    paper: { borderRadius: "20px" },
  };
  return (
    <div className="grid-dialog-project">
      <Button variant="outlined" onClick={handleClickOpen}>
        <span className="text-buttun-dialog-min ">Enter Vote</span>
      </Button>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          classes={{
            root: classes.root,
            paper: classes.paper,
          }}
        >
          <div className="box-dialog-project">
            <DialogTitle style={{ borderRadius: "20px" }}>
              <div className="title-dialog-project">
                You have Mining Power{" "}
                <div className="button-project-dialog">
                  <span className="power-dialog-project">
                    {user?.power.toFixed(2) < 0.01
                      ? 0.01
                      : user?.power.toFixed(2)}
                  </span>
                </div>
              </div>
            </DialogTitle>
            <DialogContent className="content-dialog-project">
              <div className="text-dialog-project">
                Use your Mining Power for this Project
              </div>
              {status !== 2 && (
                <div className="enter-dialog-project">
                  <input
                    className="input"
                    min={1}
                    type="number"
                    value={vote?.power}
                    onChange={(e) => handleChangePower(e.target.value)}
                  />
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <div className="submit-dialog-project" onClick={handleVote}>
                Mine
              </div>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
