import React from "react";

const StyledTranscript = ({ content }: any) => {
  const parseContent = (htmlString: any) => {
    const headerMatch = htmlString.match(/<h2[^>]*>(.*?)<\/h2>/);
    const header = headerMatch ? headerMatch[1] : "Transcripts";

    const items = htmlString
      .split("<li>")
      .filter((item: any) => item.trim())
      .map((item: any) => item.replace("</li>", ""))
      .filter((item: any) => !item.includes("</h2>"));

    return {
      header,
      messages: items.map((item: any, index: any) => {
        const isSyntheticMinds = item.includes("The Synthetic Minds");
        const message = item
          .replace(/<[^>]+>/g, "")
          .replace("The Synthetic Minds", "")
          .replace("The AI Duo", "")
          .trim();

        return {
          id: index,
          speaker: isSyntheticMinds ? "The Synthetic Minds" : "The AI Duo",
          message,
          isSyntheticMinds,
        };
      }),
    };
  };

  const { header, messages } = content
    ? parseContent(content)
    : { header: "Transcripts", messages: [] };

  return (
    <div className="max-w-[604px] space-x-2 md:space-y-8">
      <h2 className="font-source-code-pro text-sm font-medium leading-7 text-end text-[#3246DC]">
        {header}
      </h2>

      <div className=" space-y-4 md:space-y-8">
        {messages.map((msg: any) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.isSyntheticMinds
                ? "justify-start md:relative md:-left-[30px]"
                : "justify-end"
            }`}
          >
            <div
              className={`relative rounded-sm flex gap-4 ${
                msg.isSyntheticMinds
                  ? "bg-[#3246DC33] max-w-[551px]"
                  : "bg-[#638BEF33] max-w-[444.85px]"
              } p-4`}
            >
              {/* Gradient Circles */}
              <div className="relative">
                <div
                  className={`w-[28.57px] h-[28.57px] rounded-full 
                    ${msg.isSyntheticMinds ? "bg-[#3246DC]" : "bg-[#638BEF]"}
                    blur-[7px] absolute -top-[4.29px] -left-[4.29px]`}
                />
                <div
                  className={`w-[22.86px] h-[22.86px] rounded-full 
                    ${
                      msg.isSyntheticMinds
                        ? "bg-gradient-to-b from-[#3246DC] to-[#1B2576]"
                        : "bg-gradient-to-b from-[#638BEF] to-[#394F89]"
                    }
                    blur-[1.4px] absolute -top-[1.43px] -left-[1.43px]`}
                />
                <div className="w-5 h-5 rounded-full bg-transparent" />
              </div>

              <div
                className={`px-4 ${
                  msg.isSyntheticMinds ? "max-w-[483px]" : "max-w-[376.85px]"
                }`}
              >
                <div className="font-source-code-pro text-[13.23px] font-bold leading-6 text-white mb-4">
                  {msg.speaker}
                </div>
                <div className="font-source-code-pro text-sm font-medium leading-[17.5px] text-white">
                  {msg.message}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyledTranscript;
