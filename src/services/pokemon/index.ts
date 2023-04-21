import axiosInstance from '../axios'
// import {IVehicle} from "./types";
import Endpoints from "./endpoints";
import axios from "axios";
// <IVehicle[]>
export const get = (params) => axios.get(params)