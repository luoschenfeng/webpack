- compalition

    - _runCodeGenerationJobs()  -> moduleAssets

        - JavascriptGenerator

            - this.generator.generate  -> codeGenerationResults：CachedSource[]

                - sources

                - runtimeRequirements

    - createChunkAssets() -> chunkAssets(生成最终的文件内容数组)

        - JavascriptModulesPlugin

            - renderMain 

                - moduleRuntime
              
                - runtimeRequirements(globalRuntime)

    - emitAsset



    
