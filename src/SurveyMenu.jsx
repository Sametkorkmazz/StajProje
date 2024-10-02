import React from "react";
import Grow from "@mui/material/Grow";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
function SurveyMenu(props) {
  return (
    <Grow in={true}>
      {
        <Box display="inline-block">
          <Card
            className="border rounded"
            variant="outlined"
            id={"list-card"}
            style={{ backgroundColor: "white" }}
          >
            <CardContent className="py-2">
              <List
                id="list"
                sx={{
                  // hover states
                  "& .MuiListItemButton-root:hover": {
                    bgcolor: "#f2f2f2",
                    "&, & .MuiListItemIcon-root": {},
                  },
                }}
              >
                <ListItem>
                  <ListItemButton
                    onClick={() => props.set_OpenSurveyCreation(true)}
                  >
                    <ListItemText
                      style={{ color: "#12065C" }}
                      className="list-text"
                      primary="Anket Oluştur"
                    >
                      {" "}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                <Divider className="divider" />
                <ListItem>
                  <ListItemButton
                    onClick={() => props.set_OpenSurveyAnswer(true)}
                  >
                    <ListItemText
                      style={{ color: "#12065C" }}
                      className="list-text"
                      primary="Eski Anketler"
                    >
                      {" "}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                <Divider className="divider" />
                <ListItem>
                  <ListItemButton>
                    <ListItemText
                      style={{ color: "#12065C" }}
                      className="list-text"
                      primary="Aktif Anket Sayısı: 0"
                    >
                      {" "}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                <Divider className="divider" />
              </List>
            </CardContent>
          </Card>
        </Box>
      }
    </Grow>
  );
}

export default SurveyMenu;
