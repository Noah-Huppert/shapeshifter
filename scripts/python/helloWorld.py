from os import walk#Reads files
import os,sys#Various functions, EX: String joining
import threading#Makes function run every so often

#Global Vars


#Used in dif method
#Stores each files contents
fileContents = []
prevFileContents = []

#Used in Name Method
#Store file paths
files = []
prevFiles = []

#Used in Counting Method
#Store the ammount of files
fileCount = -1
prevFileCount = -1


def watchFiles():
    #Importing Globals
    global fileContents, prevFileContents, fileCount, prevFileCount, prevFiles, files
    
    #Local vars
    dirs = []
    dirs = []
    
    threading.Timer(2.0, watchFiles).start()#Run function every 2 seconds
    dir = r"C:\Users\Noah\Noah\Programing\HTML\shapeshifter"
    
    if len(prevFiles) != 0:#Stores prev file names
        prevFiles = files
        files = []#Resets files
    
    # Getting directories and files
    for (dirpath, dirnames, filenames) in walk(dir):
        #Making array of all dirs in current dir
        if len(dirnames) > 0:
            for dirname in dirnames:
                dirs.append(os.path.join(dirpath, dirname))
        
        #Making array of all files in current dir
        if len(filenames) > 0:
            for filename in filenames:
                files.append(os.path.join(dirpath, filename))
                
                
    if len(prevFiles) == 0:#=Handles first time run
        prevFiles = files
    
    
    #Counting file check method - If ammount of files changes
    if prevFileCount == -1 and fileCount == -1:
        fileCount = len(files)
        prevFileCount = fileCount
    else:
        prevFileCount = fileCount
        fileCount = len(files)
    
    if fileCount != prevFileCount:
        print("File Changed - Detected by: Counting method", fileCount, prevFileCount)
        return True
    
    print(fileCount, prevFileCount)#For debug
    
    #File name check method - If file names differ
    counter = 0
    while counter < len(files):
        if files[counter] != prevFiles[counter]:
            print("File Changed - Detected by: Name method", fileCount, prevFileCount)
            return True
        counter = counter + 1
        
    
    if len(fileContents) != 0:
        counter = 0
        for file in files:
            try:#Handles File being deleted
                fileObj = open(file, 'r')
                try:#Handles invalid encoding
                    if len(fileContents) != 0:
                        prevFileContents[counter] = fileContents[counter]
                    
                    fileContents[counter] = fileObj.readlines()
                except UnicodeDecodeError:
                    if len(fileContents) != 0:
                        prevFileContents[counter] = fileContents[counter]
                    
                    fileContents[counter] = 'Invalid Encoding'
                fileObj.close()
                counter = counter + 1
            except:
                del(prevFileContents[fileCount:])
                del(fileContents[fileCount:])
    else:
        counter = 0
        for file in files:
            fileObj = open(file, 'r')
            fileContent = ""
            try:#Handles invalid encoding
                fileContent = fileObj.readlines()
                prevFileContents.append(fileContent)
                fileContents.append(fileContent)
            except UnicodeDecodeError:
                prevFileContents.append('Invalid Encoding')           
                fileContents.append('Invalid Encoding')
            fileObj.close()
    
    
    #Dif checking method
    counter = 0
    while counter < len(files):
        try:
            if fileContents[counter] != prevFileContents[counter]:
                print("File Changed - Detected by: Dif method", fileCount, prevFileCount)
                return True
        except:
            print("Dif Check Method - ", counter, fileContents[counter], prevFileContents[counter])
        
        counter = counter + 1;

    
watchFiles()