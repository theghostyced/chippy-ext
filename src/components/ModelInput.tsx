// not used yet, but will be used when model 4 is more widely available
import { useStorage } from '@plasmohq/storage/hook';
import { AI_MODEL_STORAGE_KEY, DEFAULT_SETTINGS } from '~utils/constants';
import { SupportedAIModels } from '~utils/types';

function ModelInput() {
  const [aiAPIModel, setAiAPIModel] = useStorage<string>(
    AI_MODEL_STORAGE_KEY,
    DEFAULT_SETTINGS.model,
  );

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAiAPIModel(e.target.value);
  };
  return (
    <>
      <select value={aiAPIModel} onChange={handleModelChange}>
        <option value={SupportedAIModels.gpt3}>GPT-3.5-turbo</option>
        {/* only support 3.5 until gpt4 is more widely available */}
        {/* <option value={SupportedAIModels.gpt4}>GPT-4</option> */}
      </select>
    </>
  );
}

export default ModelInput;
