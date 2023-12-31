import Image from "next/image";
import EditBoissonModal from "./editPubModal";
import DeleteAnnonceModal from "./deleteAdModal";
import { PUBLIC_URL } from "../../../config/api";
import DetailsADModal from "./detailsAdModal";

export default function AdCard({ Ad, fetchAdvertisements, advertisers }) {
  return (
    <div className="h-[270px] rounded bg-white p-[10px] text-start flex flex-col justify-between shadow-lg">
      <div className="flex flex-col items-center justify-between gap-4">
        <video
          className="object-cover w-10/12 rounded-lg shadow-md"
          controls
          width="full"
          height="120"
          loading="lazy"
        >
          <source src={`${PUBLIC_URL}${Ad.path_video}`} type="video/mp4" />
        </video>

        <div className="flex justify-between w-full ">
          <h2 className="font-bold py-1 px-2 w-fit text-dark-grey text-[20px] rounded flex justify-center items-center">
            {Ad?.nom_annonce}
          </h2>
          <div className="flex justify-between gap-2 ">
            <EditBoissonModal
              Ad={Ad}
              fetchAdvertisements={fetchAdvertisements}
              advertisers={advertisers}
            />
            <DeleteAnnonceModal
              Ad={Ad}
              fetchAdvertisements={fetchAdvertisements}
            />
            <DetailsADModal Ad={Ad} />
          </div>
        </div>
      </div>
    </div>
  );
}
