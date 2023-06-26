import React from "react";
import Link from "next/link";

import GoldBgBtn from "./common/GoldBgBtn";
import TransparentBgBtn from "./common/TransparentBgBtn";
import { constants } from "../../config/constants";
const AuditPhoto1 = "/assets/images/Audit_photo1.png";
const PTCAudit = () => {
  return (
    <div className="text-white py-10 flex flex-col gap-8 xl:px-28">
      <h1 className="text-xl text-center font-[600] mb-5 sm:text-2xl lg:text-4xl">
        PTC AUDIT INTERVIEW
      </h1>

      <div className="relative grid gap-5 md:grid-rows-2 md:grid-cols-2">
        <div className="bg-[#121015] border border-[#919092] p-5 rounded-md flex flex-col justify-center gap-5 md:row-span-2">
          <p className="text-sm font-[300] lg:text-base">
            Audit Interview is a paid service that evaluates projects and
            provides them with Audit certificates. The service is hosted by
            Kevin White, PTC’s CEO, and is designed to identify the strong and
            weak points of each project. The audit certificates, which provide a
            thorough breakdown of each aspect oN the interviewed projects, You
            can read the audit results on our Medium blog.
          </p>

          <p className="text-sm font-[300] lg:text-base">
            If you are interested in an audit for your project, please feel free
            to join our discord Server and open a support ticket.
          </p>

          <div className="mt-5 flex flex-col items-center justify-center gap-4 xs:flex-row md:flex-col lg:flex-row">
            <Link href={constants.medium} passHref>
              <a>
                <GoldBgBtn btnLabel="MEDIUM" />
              </a>
            </Link>
            <Link href={constants.discord} passHref>
              <a> <TransparentBgBtn btnLabel="JOIN DISCORD" /></a>
            </Link>

          </div>
        </div>

        <div className="bg-[#121015] border border-[#919092] p-2 rounded-md flex justify-center">
          <img
            src={AuditPhoto1}
            alt=""
            className="w-full h-full md:max-w-[400px]"
          />
        </div>

        <div className="bg-[#121015] border border-[#919092] p-2 rounded-md flex justify-center">
          <img
            src={"/assets/images/audit_photo_2.png"}
            alt=""
            className="w-full h-full md:max-w-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default PTCAudit;
