!macro preInit
    SetRegView 64
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Program Files\Light Reader"
    WriteRegExpandStr HkCU "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Program Files\Light Reader"
    SetRegView 32
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Program Files\Light Reader"
    WriteRegExpandStr HkCU "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Program Files\Light Reader"
!macroend
