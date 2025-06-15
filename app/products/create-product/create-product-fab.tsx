"use client";

import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateProductModal from "./create-product-modal";
import { useState } from "react";

export default function CreateProductFab() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <CreateProductModal
        open={modalVisible}
        handleClose={() => setModalVisible(false)}
      />
      <div className="fixed left-10 bottom-10 z-50">
        <Fab color="primary" onClick={() => setModalVisible(true)}>
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}